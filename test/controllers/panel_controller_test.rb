require 'test_helper'

class PanelControllerTest < ActionDispatch::IntegrationTest
  test "should get charges" do
    get panel_charges_url
    assert_response :success
  end

  test "should get users" do
    get panel_users_url
    assert_response :success
  end

  test "should get pay" do
    get panel_pay_url
    assert_response :success
  end

end
