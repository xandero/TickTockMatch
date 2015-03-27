Rails.application.routes.draw do
  root :to => 'pages#home'

  resources :users
  resources :users, :controller => "users", :path_names => { :edit => "settings" }

  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'
end
