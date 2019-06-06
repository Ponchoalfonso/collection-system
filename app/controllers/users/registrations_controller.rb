class Users::RegistrationsController < Devise::RegistrationsController
  clear_respond_to 
  respond_to :html, :json

  private
    def sign_up_params
      params.require(:user).permit(
        :name,
        :last_name,
        :second_last_name,
        :phone_number,
        :password,
        :password_confirmation
      )
    end

  private
    def account_update_params
      params.require(:user).permit(
        :name,
        :last_name,
        :second_last_name,
        :phone_number,
        :password,
        :password_confirmation
      )
    end
end