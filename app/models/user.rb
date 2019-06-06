class User < ApplicationRecord
  # Associations
  belongs_to :role
  has_many :charges
  
  # Setting default role to new user
  before_validation :set_default_role

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :rememberable, :validatable, :authentication_keys => [:phone_number]
  validates :phone_number, uniqueness: true

  attr_accessor :login

  def login=(login)
    @login = login
  end

  def login
    @login || self.phone_number
  end

  def email_required?
    false
  end

  def email_changed?
    false
  end

  def will_save_change_to_email?
  end

  def payments
    payments = []
    self.charges.each do  |charge|
      charge.payments.each do |payment|
        payments.push(payment)
      end
    end

    return payments
  end

  private
    def set_default_role
      self.role ||= Role.find_by_name('customer')
    end
end
