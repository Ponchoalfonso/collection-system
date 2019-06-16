class PanelController < ApplicationController
  before_action :authenticate_user!
  before_action :set_data

  def index
    @payment = Payment.new
  end

  private
    def set_data
      if current_user.role.permission_level > 0
        @charges = Charge.order('created_at DESC')
      else
        @charges = current_user.charges.order('created_at DESC')
      end
    end
end
