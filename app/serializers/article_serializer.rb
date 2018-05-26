class ArticleSerializer
  include FastJsonapi::ObjectSerializer
  attributes :content, :title, :slug
end
