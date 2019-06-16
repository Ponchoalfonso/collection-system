class Users::RegistrationsController < Devise::RegistrationsController

  def create    
    build_resource(sign_up_params)

    resource.save
    # yield resource if block_given?
    if resource.persisted?
      respond_to do |format|
        format.json { render json: 'Ok', status: 200 }
      end
    else
      clean_up_passwords resource
      #passing block to handle error in signup for json
      #http://edgeapi.rubyonrails.org/classes/ActionController/Responder.html
      respond_to do |format|
        msg = resource.errors.full_messages.join("<br>").html_safe
        format.json { render json: {message: msg}, status: 401 }
      end
    end
  end

  private
    def sign_up_params
      params.require(:user).permit(
        :name,
        :last_name,
        :second_last_name,
        :phone_number,
        :password,
        :password_confirmation,
        :role_id,
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
        :password_confirmation,
      )
    end
end