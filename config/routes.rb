Rails.application.routes.draw do
  root :to => 'pages#home'

  resources :users, :matches, :conversations, :questions
  resources :profiles, only: [:show, :index]

  get '/matches/find_match' => 'matches#find_match'

  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'
end
