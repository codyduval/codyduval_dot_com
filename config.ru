require './app'

  not_found do
      send_file(File.join(File.dirname(__FILE__), 'public', '404.html'), {:status => 404})
  end

run Sinatra::Application


