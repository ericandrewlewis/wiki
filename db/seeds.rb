# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all

User.create!({
  username: "eric",
  password_digest: "$2a$11$K33t2objHvHb3Aq.935wseRgaNGcuJsp2hbkMrZFvGzw2FcjVbH..",
  email: "eric.andrew.lewis@gmail.com",
  name: "Eric Lewis"
})
