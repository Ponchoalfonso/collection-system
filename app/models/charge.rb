class Charge < ApplicationRecord
  belongs_to :user
  has_many :payments
  before_validation :set_payed

  def total_payed
    total = 0
    self.payments.each do |payment|
      total += payment.amount
    end

    return total
  end

  def total_to_pay
    total = self.amount - self.total_payed
  end

  def set_payed
    if self.amount != nil
      self.payed = self.total_payed >= self.amount
    end
  end
end
