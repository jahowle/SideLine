class UsersController < ApplicationController

    wrap_parameters format: []

    def create
        user = User.create(user_params)
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