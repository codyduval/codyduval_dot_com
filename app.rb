require 'rubygems'
require 'sinatra'
require 'haml'
require 'sass'

get 'assets/css/custom.css' do
  scss :styles
end

get '/' do
  redirect '/index.html'
end



