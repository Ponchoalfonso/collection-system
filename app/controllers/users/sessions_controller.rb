class Users::SessionsController < Devise::SessionsController
  clear_respond_to 
  respond_to :html, :json
end