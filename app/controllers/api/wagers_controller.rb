class API::WagersController < ApplicationController

    skip_before_action :authorize, only: [:index]

    def index
        wagers = Wager.all 
        render json: wagers
    end
end
