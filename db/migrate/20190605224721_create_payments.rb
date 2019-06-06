class CreatePayments < ActiveRecord::Migration[5.2]
  def change
    create_table :payments do |t|
      t.decimal :amount
      t.references :charge

      t.timestamps
    end
  end
end
