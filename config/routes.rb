Rails.application.routes.draw do
  root to: 'site#home'
  get 'home', to: 'site#home'
  get 'start', to: 'site#start'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
