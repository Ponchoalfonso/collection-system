json.extract! charge, :id, :amount, :description, :payed, :created_at, :updated_at
json.fcreated_at charge.created_at.localtime.strftime("%Y-%m-%d %k:%M")
json.famount number_to_currency charge.amount
json.ftpayed number_to_currency charge.total_payed
json.fttpay number_to_currency charge.total_to_pay
json.client "#{charge.user.name} #{charge.user.last_name}"
json.user do
  json.(charge.user, :id, :name, :last_name, :second_last_name)
end
json.url charge_url(charge, format: :json)
