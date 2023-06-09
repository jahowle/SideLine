Rails.application.routes.draw do

  namespace :api do
    post "/login", to: "sessions#create"
    post "/google-login", to: redirect("/auth/google_oauth2")
    delete "/logout", to: "sessions#destroy"
    get "/me", to: "users#show"
    post "/signup", to: "users#create"
    patch "/update/:id", to: "users#update"
    patch "/cancel_take_wager/:id", to: "wagers#cancel_take_wager"
    patch "/settle_wager/:id", to: "wagers#settle_wager"
    post "/settle_wagers", to: "wagers#settle_wagers"
    resources :wagers, only: [:create, :index, :show, :update, :destroy]
    resources :games, only: [:index, :show, :create, :update]
    resources :users, only: [:update]
  end

  get "auth/:provider/callback", to: "sessions#omniauth"
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }


end
