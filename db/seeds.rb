# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

['Cliente', 'Vendedor', 'Dueño'].each_with_index do |role, i|
  Role.create( name: role, permission_level: i )
end

User.create(
  name: 'Alfonso',
  last_name: 'Valencia',
  second_last_name: 'Sandoval',
  phone_number: '3411077998',
  password: 'poncho123',
  role_id: '3'
)