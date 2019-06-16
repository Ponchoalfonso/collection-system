class ChargesController < ApplicationController
  before_action :set_charge, only: [:show, :edit, :update, :destroy]

  def index
    @charges = Charge.all
  end

  def show
  end

  def new
    @charge = Charge.new
  end

  def edit
  end

  def create
    @charge = Charge.new(charge_params)

    respond_to do |format|
      if @charge.save
        format.json { render :show, status: :created, location: @charge }
      else
        format.json { render json: @charge.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @charge.update(charge_params)
        format.json { render :show, status: :created, location: @charge }
      else
        format.json { render json: @charge.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @charge.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
    def set_charge
      @charge = Charge.find(params[:id])
    end

    
    def charge_params
      json = JSON.parse(params.require(:charge))
      other = Hash.new
      other[:amount] = json["amount"]
      other[:description] = json["description"]
      other[:user_id] = json["user_id"]
      return other
    end
end
