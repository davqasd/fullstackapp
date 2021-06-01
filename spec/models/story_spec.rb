# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Story, type: :model do
  describe 'associations' do
    it { should have_many(:articles) }
  end
end
