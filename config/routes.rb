Rails.application.routes.draw do
  root :to => 'pages#home'

  resources :users
  resources :profiles, only: [:show, :index]
  resources :conversations, only: [:show, :index]
  resources :matches, only: [:show, :index]

  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'
end
