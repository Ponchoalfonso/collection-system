json.extract! charge, :id, :amount, :description, :created_at, :updated_at
json.user do
  json.(charge.user, :id, :name, :last_name, :second_last_name)
end
json.url charge_url(charge, format: :json)
