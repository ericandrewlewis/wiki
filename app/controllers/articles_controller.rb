class ArticlesController < ApiController
  before_action :require_login

  def create
    article = Article.create!(article_params)
    render json: { token: article.auth_token }
  end

  def show_for_slug
    article = Article.where(slug: params['slug'])
    json_string =

    render json: ArticleSerializer.new(article).serializable_hash
  end

  private

  def article_params
    params.require(:article).permit(:content, :title, :slug)
  end

end
