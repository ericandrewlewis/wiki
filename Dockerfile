FROM arm64v8/ruby

RUN gem install rails

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
  apt-get install -y nodejs

COPY . /app

RUN cd /app && bundle install

RUN cd /app && npm install

RUN cd /app && npm run build

WORKDIR /app

CMD ["/usr/local/bundle/bin/rails", "s"]
