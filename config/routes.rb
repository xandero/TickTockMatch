Rails.application.routes.draw do
  root :to => 'pages#home'

  resources :users
  resources :profiles, only: [:show, :index]

  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'
end
