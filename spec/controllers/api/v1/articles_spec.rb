# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::ArticlesController, type: :controller do
  include ApiHelper

  describe 'GET index' do
    before(:each) { create_list(:article, 2) }

    shared_examples 'api' do
      it 'check data' do
        get :index

        expect(data).to match_array(expect_fields)
        expect(data.size).to eq(expect_fields.size)
      end
    end

    it 'render status 201' do
      get :index

      expect(response).to have_http_status(:success)
    end

    describe 'check attributes' do
      let(:data) { body.keys }
      let(:expect_fields) { %w[articles meta] }

      it_behaves_like 'api', 'check data'
    end

    describe 'check articles' do
      let(:data) { body['articles'][0].keys }
      let(:expect_fields) { %w[id name body atype story_id created_at updated_at] }

      it_behaves_like 'api', 'check data'
    end

    describe 'check meta' do
      let(:data) { body['meta'].keys }
      let(:expect_fields) { %w[page size total total_pages success] }

      it_behaves_like 'api', 'check data'
    end

    describe 'params' do
      it 'grouped_by' do
        get :index, params: { grouped_by: 'story_id' }

        data = body.keys
        expect_fields = %w[grouped_articles meta]
        groups_keys = body['grouped_articles'][0].keys
        expect_groups_keys = %w[articles count_articles count_articles_types grouped_by last_created_article]
        article_keys = body['grouped_articles'][0]['articles'][0].keys
        expect_article_keys = %w[atype body created_at id name story_id updated_at]

        expect(data).to match_array(expect_fields)
        expect(data.size).to eq(expect_fields.size)

        expect(groups_keys).to match_array(expect_groups_keys)
        expect(groups_keys.size).to eq(expect_groups_keys.size)

        expect(article_keys).to match_array(expect_article_keys)
        expect(article_keys.size).to eq(expect_article_keys.size)
      end

      it 'q' do
        get :index, params: { q: 'name' }

        names = body['articles'].map { |record| record['name'] }

        expect(names.select { |name| name =~ /.*name.*/ })
      end

      it 'q not found' do
        get :index, params: { q: 'test' }

        expect(body['articles']).to be_blank
      end
    end
  end
end
