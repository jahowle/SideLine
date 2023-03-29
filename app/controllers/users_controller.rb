class UsersController < ApplicationController

    def create
        user = User.create(username: params[:username], password: params[:password], password_confirmation: params[:password_confirmation])
        if user.valid?
          render json: user, status: :created
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end
    
    private

    # Need to figure out why using is causing an error
    def user_params
        params.permit(:username, :password, :password_confirmation, :wins, :losses, :balance)
    end

end