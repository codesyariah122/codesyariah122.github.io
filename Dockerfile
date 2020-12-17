FROM jekyll/jekyll:latest

ARG build_command
ENV BUILD_COMMAND ${build_command}

RUN bundle install

CMD ${BUILD_COMMAND}

