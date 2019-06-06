class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :action_permitted?

  protected
    def configure_permitted_parameters
      added_attrs = [:name, :last_name, :second_last_name, :phone_number, :password, :password_confirmation]
      devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
      devise_parameter_sanitizer.permit :account_update, keys: added_attrs
    end

  private
    def permissions
      permissions = {
        "site#starp" => { min: 1, redirect_url: "/", message: "Not allowed!"},
      }
    end

  protected
    def action_permitted?
      user_level = -1;
      if user_signed_in?
        user_level = current_user.role.permission_level
      end

      current_action = "#{controller_name}##{action_name}"
      permission = permissions[current_action]

      if permission != nil && user_level < permission[:min]
        flash[:notice] = permission[:message]
        redirect_to permission[:redirect_url]
      end
    end
end
