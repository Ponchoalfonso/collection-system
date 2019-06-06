Rails.application.routes.draw do
  # Root route
  root to: 'site#home'

  # Site routes
  get 'home', to: 'site#home'
  get 'start', to: 'site#start'
  
  # Devise routes
  devise_for :users , controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
 
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
