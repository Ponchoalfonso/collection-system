json.extract! payment, :id, :amount, :created_at, :updated_at
json.charge do
  json.(payment.charge, :id, :created_at)
end
json.user do
  json.(payment.charge.user, :id, :name, :last_name, :second_last_name)
end
json.url payment_url(payment, format: :json)
