class UsersController < ApplicationController

  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
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
        :role_id
      )
    end
end
