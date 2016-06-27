module Ahoy
  module StringGenerator
    def generate_token(length=32)
      SecureRandom.uuid
    end
  end
end