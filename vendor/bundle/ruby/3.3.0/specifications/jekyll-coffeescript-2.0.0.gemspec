# -*- encoding: utf-8 -*-
# stub: jekyll-coffeescript 2.0.0 ruby lib

Gem::Specification.new do |s|
  s.name = "jekyll-coffeescript".freeze
  s.version = "2.0.0".freeze

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Parker Moore".freeze]
  s.date = "2019-09-06"
  s.email = ["parkrmoore@gmail.com".freeze]
  s.homepage = "https://github.com/jekyll/jekyll-coffeescript".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.4.0".freeze)
  s.rubygems_version = "3.0.3".freeze
  s.summary = "A CoffeeScript converter for Jekyll.".freeze

  s.installed_by_version = "3.5.23".freeze

  s.specification_version = 4

  s.add_runtime_dependency(%q<coffee-script>.freeze, ["~> 2.2".freeze])
  s.add_runtime_dependency(%q<coffee-script-source>.freeze, ["~> 1.12".freeze])
  s.add_development_dependency(%q<bundler>.freeze, [">= 0".freeze])
  s.add_development_dependency(%q<jekyll>.freeze, ["~> 4.0".freeze])
  s.add_development_dependency(%q<rake>.freeze, [">= 0".freeze])
  s.add_development_dependency(%q<rspec>.freeze, [">= 0".freeze])
  s.add_development_dependency(%q<rubocop-jekyll>.freeze, ["~> 0.5".freeze])
end
