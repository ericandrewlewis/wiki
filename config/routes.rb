Rails.application.routes.draw do
  post   "/login"       => "sessions#create"
  delete "/logout"      => "sessions#destroy"
  get "/profile"        => "users#profile"
  resources :users
  resources :articles
  get "/articles/slug/:slug.json" => "articles#show_for_slug"

  get "/csrf-token" => "application#csrf_token"

  get '*path', to: 'catch_all#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
