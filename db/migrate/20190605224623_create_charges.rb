class CreateCharges < ActiveRecord::Migration[5.2]
  def change
    create_table :charges do |t|
      t.decimal :amount
      t.text :description
      t.boolean :payed

      t.timestamps
    end
  end
end
