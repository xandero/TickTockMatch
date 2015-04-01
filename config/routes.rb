Rails.application.routes.draw do
  root :to => 'pages#home'

  resources :users, :matches, :conversations, :questions
  resources :profiles, only: [:show, :index]

  post '/matches/review' => 'matches#review'
  post '/matches/approve_reject' => 'matches#approve_reject'
  get '/matches/:id/status' => 'matches#status'

  get '/matches/find_match' => 'matches#find_match'

  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'
end
