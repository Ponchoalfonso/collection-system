json.extract! payment, :id, :amount, :charge_id, :created_at, :updated_at
json.famount number_to_currency payment.amount
json.fcreated_at payment.created_at.localtime.strftime("%Y-%m-%d %k:%M")
json.user do
  json.(payment.charge.user, :id, :name, :last_name, :second_last_name)
end
json.url payment_url(payment, format: :json)
