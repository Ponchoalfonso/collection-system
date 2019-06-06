class Charge < ApplicationRecord
  belongs_to :user
  has_many :payments

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
end
