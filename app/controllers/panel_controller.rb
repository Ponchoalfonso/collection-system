class PanelController < ApplicationController
  before_action :authenticate_user!
  before_action :set_data

  def index
  end

  private
    def set_data
      if current_user.role.permission_level > 0
        @charges = Charge.order('created_at DESC')
        @customers = User.where(role_id: 1)
      else
      end
    end
end
