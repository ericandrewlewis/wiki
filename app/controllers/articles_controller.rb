class ArticlesController < ApiController
  before_action :require_login

  def create
    article_params = {}
    article_params[:title] = params[:article][:title]
    article_params[:slug] = article_params[:title].parameterize
    article_params[:content] = params[:article][:content].to_json
    article = Article.create!(article_params)
    render json: ArticleSerializer.new(article).serializable_hash
  end

  def show_for_slug
    article = Article.where(slug: params['slug'])
    json_string =

    render json: ArticleSerializer.new(article).serializable_hash
  end

end
