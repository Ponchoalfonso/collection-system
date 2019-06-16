class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?

  def after_sign_in_path_for(resource)
    panel_path #your path
  end

  private

    def configure_permitted_parameters
      added_attrs = [:name, :last_name, :second_last_name, :phone_number, :password, :password_confirmation, :role_id]
      devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
      devise_parameter_sanitizer.permit :account_update, keys: added_attrs
    end

    def only_respond_to_json
      head :not_acceptable unless params[:format] == 'json'
     end
end
