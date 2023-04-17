class Api::UsersController < ApplicationController

    wrap_parameters format: []

    skip_before_action :authorize, only: [:create]

    def create
        user = User.create(user_params)
        if user.valid?
            session[:user_id] = user.id
          render json: user, status: :created
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show
        user = User.find_by_id(session[:user_id])
        render json: user
    end

    def update
        user = User.find_by_id(session[:user_id])
        user.update(user_params)
        render json: user
    end
    
    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :wins, :losses, :balance, :id)
    end

end