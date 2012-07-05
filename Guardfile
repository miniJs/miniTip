# CoffeeScript compilation
guard 'coffeescript', :input => 'js', :output => 'js'
guard 'coffeescript', :input => 'spec/coffeescripts', :output => 'spec/javascripts'

# Jasmine tests suite
guard 'jasmine', :jasmine_url => 'http://localhost:8888/' do
  watch(%r{spec/coffeescripts/.+Spec\.coffee$}) { "spec/javascripts" }
  watch(%r{js/(.+)\.coffee$}) { "spec/javascripts" }
end