Rails.application.routes.draw do
  get 'panel/charges'
  get 'panel/users'
  get 'panel/pay'
  # Root route
  root to: 'site#home'

  # Site routes
  get 'home', to: 'site#home'
  get 'start', to: 'site#start'

  # Charges routes
  resources :charges

  # Payments routes
  resources :payments

  # Users routes


defaults format: :json do
  get 'users', to: 'users#index'
  get 'user/:id', to: 'users#show'
end

  # Panel routes
  get 'panel', to: 'panel#index', as: 'panel'

  # Devise routes
  devise_for :users , controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
 
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
