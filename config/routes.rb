Rails.application.routes.draw do
  get '*path', to: 'catch_all#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
