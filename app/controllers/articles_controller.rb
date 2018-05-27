class ArticlesController < ApiController
  before_action :require_login

  def index
    render json: ArticleSerializer.new(Article.all).serializable_hash
  end

  def create
    article_params = {}
    article_params[:title] = params[:article][:title]
    article_params[:slug] = article_params[:title].parameterize
    article_params[:content] = params[:article][:content].to_json
    article = Article.create!(article_params)
    render json: ArticleSerializer.new(article).serializable_hash
  end

  def update
    article = Article.find(params[:id])
    updates = {
      :title => params[:article][:title],
      :slug => params[:article][:title].parameterize,
      :content => params[:article][:content].to_json
    }
    article.update(updates)
    render json: ArticleSerializer.new(article).serializable_hash
  end

  def show_for_slug
    article = Article.where(slug: params['slug'])
    json_string =

    render json: ArticleSerializer.new(article).serializable_hash
  end

end
