class ApplicationController < ActionController::Base
  include ActionController::RequestForgeryProtection
  include ActionController::HttpAuthentication::Token::ControllerMethods
  protect_from_forgery unless: -> { request.format.json? }
end
