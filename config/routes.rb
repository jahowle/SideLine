Rails.application.routes.draw do

  namespace :api do
    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"
    get "/me", to: "users#show"
    post "/signup", to: "users#create"
    patch "/update/:id", to: "users#update"
    resources :wagers, only: [:create, :index, :show, :update, :delete]
    resources :games, only: [:index, :show]
  end

  get "auth/:provider/callback", to: "sessions#omniauth"
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }


end
