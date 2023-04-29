class Api::WagersController < ApplicationController

    skip_before_action :authorize, only: [:index, :create]
    before_action :require_permission, only: [:destroy]

    def index
        wagers = Wager.all 
        render json: wagers, include: [:taker, :maker, :game]
    end

    def update
        wager = Wager.find(params[:id])
        new_balance = current_user.balance - wager.amount
        wager.assign_attributes(wager_params)
        if wager.amount > current_user.balance
            render json: { errors: ["You don't have enough money to take this wager"] }, status: :unprocessable_entity
        else
            wager.save!
            current_user.update(balance: new_balance)
            render json: wager, include: [:taker, :maker, :winner, :loser, :game]
        end
    end

    def cancel_take_wager
        wager = Wager.find(params[:id])
        wager.update!(taker_id: nil, status: 0)
        current_user.update(balance: current_user.balance + wager.amount)
        render json: wager, include: [:taker, :maker, :winner, :loser, :game]
    end

    def create
        user = User.find(params[:maker_id])
        new_balance = user.balance - params[:amount].to_i
        wager = Wager.create!(
            maker_id: params[:maker_id],
            amount: params[:amount],
            pick: params[:pick],
            game_id: params[:game_id],
            status: 0
        )

        render json: wager, include: [:taker, :maker, :winner, :loser, :game]
    end

    def settle_wager
        wager = Wager.find(params[:id])

        game_winner = wager.game.home_score > wager.game.away_score ? wager.game.home_team : wager.game.away_team

        if wager.status == "open"
            wager.update(status: "expired")
            render json: wager, include: [:taker, :maker, :winner, :loser, :game]
        else
            wager.update(status: "finished")
           
            render json: wager, include: [:taker, :maker, :winner, :loser, :game]
        end
        
    end

    def settle_wagers
        data = JSON.parse(request.body.read)
        
        wagers = data["wagersToSettle"].map do |wager|
          wager_to_settle = Wager.find(wager["id"])
        end

        wagers.each do |wager|
            game_winner = wager.game.home_score > wager.game.away_score ? wager.game.home_team : wager.game.away_team
            
            if wager.status == "open"
                wager.update(status: "expired")
                wager.maker.update(balance: wager.maker.balance + wager.amount)
            elsif wager.pick == game_winner
                wager.update(status: "finished", winner: wager.maker.id, loser: wager.taker.id)
                wager.maker.update(wins: wager.maker.wins + 1, balance: wager.maker.balance + wager.amount * 2)
                wager.taker.update(losses: wager.taker.losses + 1)
            else
                wager.update(status: "finished", winner: wager.taker.id, loser: wager.maker.id)
                wager.taker.update(wins: wager.taker.wins + 1, balance: wager.taker.balance + wager.amount * 2)
                wager.maker.update(losses: wager.maker.losses + 1)
            end
        end

      
        render json: wagers, include: [:taker, :maker, :game]
      end

    


    def destroy
        wager = Wager.find(params[:id])
        wager.destroy
        wager.maker.update(balance: wager.maker.balance + wager.amount)
        head :no_content
    end

    private

    def wager_params
        params.permit(:taker_id, :status, :maker_id, :amount, :pick, :game_id, :winner)
    end

    def require_permission
        if Wager.find(params[:id]).maker != current_user
        render json: {error: "You don't have permission to do that"}
        end
    end 
end
