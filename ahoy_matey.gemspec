# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'ahoy/version'

Gem::Specification.new do |spec|
  spec.name          = "ahoy_matey"
  spec.version       = Ahoy::VERSION
  spec.authors       = ["Andrew Kane"]
  spec.email         = ["andrew@chartkick.com"]
  spec.summary       = %q{Simple, powerful visit tracking for Rails}
  spec.description   = %q{Simple, powerful visit tracking for Rails}
  spec.homepage      = "https://github.com/ankane/ahoy"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0")
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_dependency "addressable", "~> 2.3"
  spec.add_dependency "browser", "~> 0.4.1"
  spec.add_dependency "geocoder", "~> 1.1.9"
  spec.add_dependency "referer-parser", "~> 0.2.1"
  spec.add_dependency "request_store", "~> 1.0.5"

  spec.add_development_dependency "bundler", "~> 1.5"
  spec.add_development_dependency "rake"
end
