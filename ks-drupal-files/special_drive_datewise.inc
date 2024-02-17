<?php

drupal_add_js('jQuery(document).ready(function(){
	jQuery("#filter_date").datepicker({
        dateFormat: "dd-mm-yy",
        maxDate: 0,
		    minDate: new Date(2023, 11 - 1, 1),
        changeMonth: true,
        changeYear: true,
        yearRange: "-60:+10"
	});
});', 'inline');

function special_drive_data_report($form, $form_data)
{
  if (user_is_logged_in()) {
    global $base_root, $base_path, $user;

    $user_id = $user->uid;

    $details = user_subdiv_block_options($user_id);
    $user_role = $details['user_role'];
    $role_name = $details['role_name'];

    $jurisdiction_info = jurisdiction_info($user_id);
    $district_code = $jurisdiction_info['district_code'];
    $subdivision_code = $jurisdiction_info['subdivision_code'];
    $block_code = $jurisdiction_info['block_code'];
    $area_type = $jurisdiction_info['area_type'];
    $customjurisdiction = $jurisdiction_info['customjurisdiction'];
    $iscustom_juris = $jurisdiction_info['iscustom_juris'];

    if ($user_role == 12 || $user_role == 9) {
      // $options_dist = common_district_list(1) + array(made_up_code()['all_district'] => 'All');
      $options_dist = common_district_list(1);
    } else {
      $options_dist = get_district_jurisdiction($user->uid);
    }

    $form['report']['header'] = array(
      '#type' => 'markup',
      '#markup' => '<div class="white-bg"><div class="row custom-dashboard-form">'
    );

    // District filter starts -----------------------------

    //$get_district_list = common_district_list(1);

    $form['report']['district_code']  = array(
      '#prefix'             => '<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-2">',
      '#suffix'             => '</div>',
      '#title'             => t('Select District'),
      '#type'             => 'select',
      '#options'            => $options_dist,
      '#default_value'     => $user_role == 12 || $user_role == 9 ? '' : $district_code,
      '#required'         => TRUE,
      '#attributes'         => array('class' => array('form-control')),
      '#ajax'             => array(
        'event'         => 'change',
        'effect'         => 'fade',
        'callback'         => 'get_ajax_callback_address',
        'progress'         => ''
      )
    );

    // District filter ends -------------------------------

    // Sub-division filter starts -------------------------

    $value_district_code = isset($form_state['values']['district_code']) ? $form_state['values']['district_code'] : ($district_code ?? '');

    if (!empty($value_district_code) && $value_district_code != made_up_code()['all_district']) {
      if ($user_role == 5) {
        if ($customjurisdiction == 'SUBDIV' && $iscustom_juris == 'Y') {
          $get_subdivision_list = official_additional_jurisdiction_subdiv($user_id, $user_role, $iscustom_juris, $customjurisdiction);
        } else {
          $get_subdivision_list = common_subdivision_list($value_district_code);
        }
      } else {
        $get_subdivision_list = common_subdivision_list($value_district_code);
      }

      $form['report']['subdivision_code'] = array(
        '#prefix'         => '<div class="col-md-6 col-sm-12 col-xs-12 mb-2" id="subdivision_replace">',
        '#suffix'         => '</div>',
        '#title'         => 'Select Subdivision',
        '#type'         => 'select',
        '#options'         => $get_subdivision_list,
        '#default_value' => '',
        '#required'     => FALSE,
        '#attributes'     => array('class' => array('form-control')),
        '#ajax'         => array(
          'event'     => 'change',
          'effect'     => 'fade',
          'callback'     => 'get_ajax_callback_address',
          'progress'     => ''
        )
      );
    } else {
      $form['report']['subdivision_code'] = array(
        '#prefix'         => '<div class="col-md-6 col-sm-12 col-xs-12 mb-2" id="subdivision_replace">',
        '#suffix'         => '</div>',
        '#title'         => 'Select Subdivision',
        '#type'         => 'select',
        '#options'         => array('' => '-Select-'),
        '#default_value' => '',
        '#attributes'     => array('class' => array('form-control')),
        '#ajax'         => array(
          'event'     => 'change',
          'effect'     => 'fade',
          'callback'     => 'get_ajax_callback_address',
          'progress'     => ''
        )
      );
    }

    // Sub-division filter ends ---------------------------

    // Block filter starts --------------------------------

    $value_subdivision_code = isset($form_state['values']['subdivision_code']) ? ($form_state['values']['subdivision_code'] != 'all' ? $form_state['values']['subdivision_code'] : '') : '';

    if ($value_subdivision_code != '') {

      $get_areatype_list = common_areatype_list($value_district_code, $value_subdivision_code);

      $form['report']['block_type'] = array(
        '#prefix'             => '<div class="col-md-6 col-sm-12 col-xs-12 mb-2" id="block_type_replace">',
        '#suffix'             => '</div>',
        '#title'             => 'Select Block/Mun/Corp/Sez/NA/',
        '#type'             => 'select',
        '#options'             => $get_areatype_list,
        '#default_value'     => '',
        '#required'         => FALSE,
        '#attributes'         => array('class' => array('form-control')),
        '#ajax'             => array(
          'event'     => 'change',
          'effect'     => 'fade',
          'callback'     => 'get_ajax_callback_address',
          'progress'     => ''
        )
      );
    } else {
      $form['report']['block_type'] = array(
        '#prefix'             => '<div class="col-md-6 col-sm-12 col-xs-12 mb-2" id="block_type_replace">',
        '#suffix'             => '</div>',
        '#title'             => 'Select Block/Mun/Corp/Sez/NA/',
        '#type'             => 'select',
        '#options'             => array('' => '-Select-'),
        '#default_value'     => '',
        '#attributes'         => array('class' => array('form-control')),
        '#ajax'             => array(
          'event'     => 'change',
          'effect'     => 'fade',
          'callback'     => 'get_ajax_callback_address',
          'progress'     => ''
        )
      );
    }

    $value_block_type = isset($form_state['values']['block_type']) ? $form_state['values']['block_type'] : '';

    if ($value_subdivision_code != '') {
      if ($user_role == 4) {
        if ($customjurisdiction == 'BMCNS' && $iscustom_juris == 'Y') {
          $get_block_code_list = official_additional_jurisdiction_block($user_id, $user_role, $value_block_type);
        } else {
          $get_block_code_list = common_block_list($value_subdivision_code, $value_block_type);
        }
      } else {
        $get_block_code_list = common_block_list($value_subdivision_code, $value_block_type);
      }

      $form['report']['block_code'] = array(
        '#prefix'             => '<div class="col-md-6 col-sm-12 col-xs-12 mb-2" id="block_code_replace">',
        '#suffix'             => '</div>',
        '#title'             => 'Select Name',
        '#type'             => 'select',
        '#options'             => $get_block_code_list,
        '#default_value'     => '',
        '#required'         => FALSE,
        '#attributes'         => array('class' => array('form-control')),
        '#ajax'             => array(
          'event'     => 'change',
          'effect'     => 'fade',
          'callback'     => 'get_ajax_callback_address',
          'progress'     => ''
        )
      );
    } else {
      $form['report']['block_code'] = array(
        '#prefix'             => '<div class="col-md-6 col-sm-12 col-xs-12 mb-2" id="block_code_replace">',
        '#suffix'             => '</div>',
        '#title'             => 'Select Name',
        '#type'             => 'select',
        '#options'             => array('' => '-Select-'),
        '#default_value'     => '',
        '#attributes'         => array('class' => array('form-control')),
        '#ajax'             => array(
          'event'     => 'change',
          'effect'     => 'fade',
          'callback'     => 'get_ajax_callback_address',
          'progress'     => ''
        )
      );
    }

    // Block filter ends ----------------------------------

    // Date filter starts ---------------------------------

    $form['report']['filter_date'] = array(
      '#prefix' => '<div class="col-md-6 col-sm-12 col-xs-12 mb-2">',
      '#suffix' => '</div>',
      '#type' => 'textfield',
      '#title' => 'Camp Date (To)',
      '#required' => FALSE,
      '#default_value' => date('d-m-Y'),
      '#attributes' => array('id' => 'filter_date', 'class' => array('form-control'), 'readonly' => 'readonly'),
    );

    // Date filter ends -----------------------------------

    $form['report']['markup_e'] = array(
      '#type' => 'markup',
      '#markup' => '</div>',
    );

    $form['report']['clearfix'] = array(
      '#prefix' => '<div class="col-md-6 mb-2">',
      '#suffix' => '</div></div>'
    );

    // Buttons starts ------------------------------

    $form['report']['submit'] = array(
      '#id'                => 'submitBtn',
      '#value'            => t('Show Report'),
      '#attributes'        => array('class' => array('btn custom-button-green')),
      '#prefix'            => '<div class="row d-flex"><div class="col-lg-3 col-md-3 col-sm-6 col-xs-6 mb-3 mt-3">',
      '#suffix'            => '</div></div>',
      '#type'              => 'button',
      '#ajax'     => array(
        'callback' => 'reports_by_search',
        'wrapper'  => 'reports_by_search_div',
        'method'   => 'html',
        'effect'   => 'fade'
      )
    );

    // Buttons ends ------------------------------

    $form['datamarkup'] = array(
      '#type'     => 'markup',
      '#markup'     => '<div class="row">
								<div class="col-md-12">
									<div class="box-primary">
										<div class="box-body mb-2" id = "reports_by_search_div"></div>
									</div>
								</div>
							</div>'
    );

    return $form;
  } else {
    header("Location:https://wblc.gov.in/user/login");
  }
}

function reports_by_search($form, &$form_state)
{
  global $user;

  $user_id = $user->uid;
  $details = user_subdiv_block_options($user_id);
  $user_role = $details['user_role'];
  $role_name = $details['role_name'];

  $val = $form_state['values'];

  $selected_district = $val['district_code'] ? ((int)$val['district_code'] != made_up_code()['all_district'] ? (int)$val['district_code'] : null) : null;
  $selected_subdivision = $val['subdivision_code'] ?? null;
  $selected_block_type = $val['block_type'] ?? null;
  $selected_block_code = $val['block_code'] ?? null;
  $selected_date = date('Y-m-d', strtotime($val['filter_date']));

  $output = '<table cellpadding="0" cellspacing="0" border="1" class="table table-responsive admin-custom-table">
              <tr>
                <th>Sl. No.</th>';
  $output .= '<th>District</th>
              <th>Sub-Division</th>
              <th>Block / Municipality</th>
              <th>Approx. Left Out</th>
              <th>Covered Today</th>
              <th>Cumulative Coverage</th>
              <th>House Visited</th>
              <th>Forms Collected</th>
              <th>Approved</th>
              <th>Rejected</th>
              <th>Digitised and Service Provided</th>
              </tr>';

  $totalMwLeft = 0;
  $totalMwCovered = 0;
  $totalCumulative = 0;
  $totalHouseVisited = 0;
  $totalHardCopy = 0;
  $totalServiceProvided = 0;
  $totalRejected = 0;

  if ($selected_district) {
    $query_result = db_select('special_drive_view', 'dv');

    $query_result->fields('dv', array('district_name', 'subdiv_name', 'block_mun_name', 'block_mun_code'));

    $query_result->condition('district_code', $selected_district);
    if ($selected_subdivision) {
      $query_result->condition('subdiv_code', $selected_subdivision);
    }
    if ($selected_block_code) {
      $query_result->condition('block_mun_code', $selected_block_code);
    }
    $query_result->orderBy('district_name');
    $query_result->orderBy('subdiv_name');
    $query_result->orderBy('block_mun_name');
    $query_result = $query_result->execute();

    foreach ($query_result as $key => $result) {
      $sl = $key + 1;

      $getSdMasterData = getSdMasterData($result->block_mun_code, $selected_date);
      $getSdInfoData = getSdInfoData($result->block_mun_code, $selected_date);

      $serviceProvided = $getSdMasterData[0] === NULL ? 0 : $getSdMasterData[0];
      $rowRejected = $getSdMasterData[1] === NULL ? 0 : $getSdMasterData[1];

      $rowMwLeftOut = $getSdInfoData[0] === NULL ? 0 : $getSdInfoData[0];
      $rowMwCoverToday = $getSdInfoData[1] === NULL ? 0 : $getSdInfoData[1];
      $rowCumulativeCover = $getSdInfoData[2] === NULL ? 0 : $getSdInfoData[2];
      $rowHouseVisited = $getSdInfoData[3] === NULL ? 0 : $getSdInfoData[3];
      $rowHdCopy = $getSdInfoData[4] === NULL ? 0 : $getSdInfoData[4];

      $output .= '<tr>
                        <td>' . $sl . '</td>
                        <td>' . $result->district_name . '</td>
                        <td>' . $result->subdiv_name . '</td>
                        <td>' . $result->block_mun_name . '</td>
                        <td>' . $rowMwLeftOut . '</td>
                        <td>' . $rowMwCoverToday . '</td>
                        <td>' . $rowCumulativeCover . '</td>
                        <td>' . $rowHouseVisited . '</td>
                        <td>' . $rowHdCopy . '</td>
                        <td>' . $serviceProvided . '</td>
                        <td>' . $rowRejected . '</td>
                        <td>' . $serviceProvided . '</td>
                        </tr>';
      // <td>' . $serviceProvided . '</td>

      $totalMwLeft = $totalMwLeft + $rowMwLeftOut;
      $totalMwCovered = $totalMwCovered + $rowMwCoverToday;
      $totalCumulative = $totalCumulative + $rowCumulativeCover;
      $totalHouseVisited = $totalHouseVisited + $rowHouseVisited;
      $totalHardCopy = $totalHardCopy + $rowHdCopy;

      $totalServiceProvided = $totalServiceProvided + $serviceProvided;
      $totalRejected = $totalRejected + $rowRejected;
    }
  } else {
    $query_result = db_select('special_drive_view', 'dv');

    $query_result->fields('dv', array('district_name', 'subdiv_name', 'block_mun_name', 'block_mun_code'));

    $query_result->orderBy('district_name');
    $query_result->orderBy('subdiv_name');
    $query_result->orderBy('block_mun_name');
    $query_result = $query_result->execute();

    foreach ($query_result as $key => $result) {
      $sl = $key + 1;

      $getSdMasterData = getSdMasterData($result->block_mun_code, $selected_date);
      $getSdInfoData = getSdInfoData($result->block_mun_code, $selected_date);

      $serviceProvided = $getSdMasterData[0] === NULL ? 0 : $getSdMasterData[0];
      $rowRejected = $getSdMasterData[1] === NULL ? 0 : $getSdMasterData[1];

      $rowMwLeftOut = $getSdInfoData[0] === NULL ? 0 : $getSdInfoData[0];
      $rowMwCoverToday = $getSdInfoData[1] === NULL ? 0 : $getSdInfoData[1];
      $rowCumulativeCover = $getSdInfoData[2] === NULL ? 0 : $getSdInfoData[2];
      $rowHouseVisited = $getSdInfoData[3] === NULL ? 0 : $getSdInfoData[3];
      $rowHdCopy = $getSdInfoData[4] === NULL ? 0 : $getSdInfoData[4];

      $output .= '<tr>
                        <td>' . $sl . '</td>
                        <td>' . $result->district_name . '</td>
                        <td>' . $result->subdiv_name . '</td>
                        <td>' . $result->block_mun_name . '</td>
                        <td>' . $rowMwLeftOut . '</td>
                        <td>' . $rowMwCoverToday . '</td>
                        <td>' . $rowCumulativeCover . '</td>
                        <td>' . $rowHouseVisited . '</td>
                        <td>' . $rowHdCopy . '</td>
                        <td>' . $serviceProvided . '</td>
                        <td>' . $rowRejected . '</td>
                        <td>' . $serviceProvided . '</td>
                        </tr>';
      // <td>' . $serviceProvided . '</td>

      $totalMwLeft = $totalMwLeft + $rowMwLeftOut;
      $totalMwCovered = $totalMwCovered + $rowMwCoverToday;
      $totalCumulative = $totalCumulative + $rowCumulativeCover;
      $totalHouseVisited = $totalHouseVisited + $rowHouseVisited;
      $totalHardCopy = $totalHardCopy + $rowHdCopy;

      $totalServiceProvided = $totalServiceProvided + $serviceProvided;
      $totalRejected = $totalRejected + $rowRejected;
    }
  }

  $output .= '<tr>
            <td style="background: #e3e3e3" colspan="1">&nbsp;</td>
            <td style="background: #e3e3e3" colspan="3"><strong>Total</strong></td>
            <td style="background: #e3e3e3"><strong>' . $totalMwLeft . '</strong></td>
            <td style="background: #e3e3e3"><strong>' . $totalMwCovered . '</strong></td>
            <td style="background: #e3e3e3"><strong>' . $totalCumulative . '</strong></td>
            <td style="background: #e3e3e3"><strong>' . $totalHouseVisited . '</strong></td>
            <td style="background: #e3e3e3"><strong>' . $totalHardCopy . '</strong></td>
            <td style="background: #e3e3e3"><strong>' . $totalServiceProvided . '</strong></td>
            <td style="background: #e3e3e3"><strong>' . $totalRejected . '</strong></td>
            <td style="background: #e3e3e3"><strong>' . $totalServiceProvided . '</strong></td>
            </tr>';

  $link_xls = 'special-drive-datewise-report-xls/' . encryption_decryption_fun('encrypt', $val['district_code']) . '/' . encryption_decryption_fun('encrypt', $val['subdivision_code']) . '/' . encryption_decryption_fun('encrypt', $val['block_type']) . '/' . encryption_decryption_fun('encrypt', $val['block_code']) . '/' . encryption_decryption_fun('encrypt', $selected_date);

  $current_time = strtotime('now');
  $start_time = strtotime('17:00');
  $end_time = strtotime('23:59');

  // return '<span class="pull-left"><strong>Special Drive Static Report</strong> </span><span class="pull-right">' . l('<span class="btn btn-warning" disabled="disabled"> DOWNLOAD EXCEL <i class="fa fa-download"></i></span>', $link_xls, array('html' => TRUE, 'attributes' => array('target' => '_blank'))) . '</span><br/><br/>' . $output;

  return $output;
}

// EXCEL GENERATION STARTS ---------------
function special_drive_data_xls($district_code = '', $subdiv = '', $block_type = '', $block_code = '', $selected_date = '')
{
  global $user;

  $user_id = $user->uid;
  $details = user_subdiv_block_options($user_id);
  $user_role = $details['user_role'];
  $role_name = $details['role_name'];

  $selected_district = encryption_decryption_fun('decrypt', $district_code);
  $selected_subdivision = encryption_decryption_fun('decrypt', $subdiv);
  $selected_block_code = encryption_decryption_fun('decrypt', $block_code);
  $filter_date = encryption_decryption_fun('decrypt', $selected_date);
  $formattedFilterDate = date('Y-m-d', strtotime($filter_date));

  echo $selected_district;
  die;

  $filter_district = $selected_district == made_up_code()['all_district'] || $selected_district == null ? null : $selected_district;

  $current_time = strtotime('now');
  $start_time = strtotime('17:00');
  $end_time = strtotime('23:59');
  $date = $current_time >= $start_time && $current_time <= $end_time ? date('d/m/Y') : date('d/m/Y', strtotime('-1day'));
  $report_heading = 'Datewise Special Drive Static Report';

  // Excel class file include
  $file = drupal_get_path('module', 'genfunction') . "/PHPExcel/Classes/PHPExcel.php";
  $file2 = drupal_get_path('module', 'genfunction') . "/PHPExcel/Classes/PHPExcel/IOFactory.php";
  require_once $file;
  require_once $file2;
  $objPHPExcel = new PHPExcel();
  $objPHPExcel->getProperties()->setCreator("Maarten Balliauw")
    ->setLastModifiedBy("Maarten Balliauw")
    ->setTitle("Office 2007 XLSX Test Document")
    ->setSubject("Office 2007 XLSX Test Document")
    ->setDescription("Test document for Office 2007 XLSX, generated using PHP classes.")
    ->setKeywords("office 2007 openxml php")
    ->setCategory("Test result file");
  $sheet = $objPHPExcel->getActiveSheet();
  $default_border = array(
    'style' => PHPExcel_Style_Border::BORDER_THIN,
  );
  $style_header = array(
    'borders' => array(
      'bottom' => $default_border,
      'left' => $default_border,
      'top' => $default_border,
      'right' => $default_border,
    ),
    'fill' => array(
      'type' => PHPExcel_Style_Fill::FILL_SOLID,
      'color' => array('rgb' => '99A306'),
    ),
    'font' => array(
      'bold' => true,
    ),

    'alignment' => array(
      'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
      'bold' => true,
      'style' => PHPExcel_Style_Border::BORDER_NONE,
      'color' => array('rgb' => 'FFFFFF'),
      'rotation' => 0,
      'wrap' => true
    ),
  );

  $style = array(
    'alignment' => array(
      'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
      'bold' => true,
      'style' => PHPExcel_Style_Border::BORDER_MEDIUM,
      'color' => array('rgb' => '99A306')
    ),
    'borders' => array(
      'bottom' => $default_border,
      'left' => $default_border,
      'top' => $default_border,
      'right' => $default_border,
    ),
  );

  $starting_pos = ord('A');
  $sheet->mergeCells('A1:L1');
  $sheet->setCellValue('A1', $report_heading);
  $sheet->getStyle("A1:L1")->applyFromArray($style_header);
  $sheet->getStyle("A1:L1")->getFont()->setSize(20);
  $sheet->getStyle("A2:L2")->applyFromArray($style);

  //$sheet->getStyle("A1:E1")->getAlignment()->setWrapText(true); 
  $starting_pos = ord('A');

  $starting_pos = ord('A');
  $sheet->setCellValue('A2', $areaname);
  $border_style = array(
    'style' => PHPExcel_Style_Border::BORDER_THIN,
    'color' => array('rgb' => '99A306')
  );

  $sheet->getStyle("A2:A4")->getBorders()->getLeft()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
  $sheet->getStyle("A2:A4")->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
  $sheet->getStyle("B2:B4")->getBorders()->getLeft()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
  $sheet->getStyle("B2:B4")->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
  $sheet->getStyle("C2:C4")->getBorders()->getLeft()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
  $sheet->getStyle("C2:C4")->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
  $sheet->getStyle("D2:D4")->getBorders()->getLeft()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
  $sheet->getStyle("D2:D4")->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
  $sheet->getStyle("E2:E4")->getBorders()->getLeft()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
  $sheet->getStyle("E2:E4")->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);

  $sheet->getStyle("F2:F4")->getBorders()->getLeft()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
  $sheet->getStyle("F2:F4")->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
  $sheet->getStyle("G2:G4")->getBorders()->getLeft()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
  $sheet->getStyle("G2:G4")->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
  $sheet->getStyle("H2:H4")->getBorders()->getLeft()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
  $sheet->getStyle("H2:H4")->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
  $sheet->getStyle("I2:I4")->getBorders()->getLeft()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
  $sheet->getStyle("I2:I4")->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
  $sheet->getStyle("J2:J4")->getBorders()->getLeft()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
  $sheet->getStyle("J2:J4")->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
  $sheet->getStyle("K2:K4")->getBorders()->getLeft()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
  $sheet->getStyle("K2:K4")->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
  $sheet->getStyle("L2:L4")->getBorders()->getLeft()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
  $sheet->getStyle("L2:L4")->getBorders()->getRight()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);

  $sheet->getStyle("A2:E2")->applyFromArray(
    array(
      'alignment' => array(
        'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
        'vertical'   => PHPExcel_Style_Alignment::VERTICAL_CENTER,
        'bold' => true,
        'style' => PHPExcel_Style_Border::BORDER_MEDIUM,
        'color' => array('rgb' => '99A306'),
        'rotation' => 0,
        'wrap' => true
      ),
      'font' => array(
        'bold' => true,
      ),
    )
  );

  $sheet->getColumnDimension('A')->setAutoSize(false);
  $sheet->getColumnDimension('B')->setAutoSize(false);
  $sheet->getColumnDimension('C')->setAutoSize(false);
  $sheet->getColumnDimension('D')->setAutoSize(false);
  $sheet->getColumnDimension('E')->setAutoSize(false);
  $sheet->getColumnDimension('F')->setAutoSize(false);
  $sheet->getColumnDimension('G')->setAutoSize(false);
  $sheet->getColumnDimension('H')->setAutoSize(false);
  $sheet->getColumnDimension('I')->setAutoSize(false);
  $sheet->getColumnDimension('K')->setAutoSize(false);
  $sheet->getColumnDimension('L')->setAutoSize(false);

  $sheet->getColumnDimension('A')->setWidth(20);
  $sheet->getColumnDimension('B')->setWidth(40);
  $sheet->getColumnDimension('C')->setWidth(30);
  $sheet->getColumnDimension('D')->setWidth(30);
  $sheet->getColumnDimension('E')->setWidth(30);
  $sheet->getColumnDimension('F')->setWidth(30);
  $sheet->getColumnDimension('G')->setWidth(30);
  $sheet->getColumnDimension('H')->setWidth(30);
  $sheet->getColumnDimension('I')->setWidth(30);
  $sheet->getColumnDimension('J')->setWidth(30);
  $sheet->getColumnDimension('K')->setWidth(30);
  $sheet->getColumnDimension('L')->setWidth(30);

  // Header Section for excel
  $sheet->setCellValue('A2', 'SL');
  $sheet->setCellValue('B2', 'District');
  $sheet->setCellValue('C2', 'Sub-Division');
  $sheet->setCellValue('D2', 'Block / Municipality');
  $sheet->setCellValue('E2', 'Approx. Left Out');

  $sheet->setCellValue('F2', 'Covered Today');
  $sheet->setCellValue('G2', 'Cumulative Coverage');
  $sheet->setCellValue('H2', 'House Visited');
  $sheet->setCellValue('I2', 'Forms Collected');
  $sheet->setCellValue('J2', 'Applications Approved');
  $sheet->setCellValue('K2', 'Applications Rejected');
  $sheet->setCellValue('L2', 'Digitised and Service Provided');

  $sheet->getStyle("L")->applyFromArray(array(
    'alignment' => array(
      'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
      'vertical'   => PHPExcel_Style_Alignment::VERTICAL_CENTER,
      'bold' => true,
      'style' => PHPExcel_Style_Border::BORDER_MEDIUM,
      'color' => array('rgb' => '99A306'),
    )
  ));

  $sheet->getStyle("A2:L2")->applyFromArray(array(
    'alignment' => array(
      'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
      'vertical'   => PHPExcel_Style_Alignment::VERTICAL_CENTER,
      'bold' => true,
      'style' => PHPExcel_Style_Border::BORDER_MEDIUM,
      'color' => array('rgb' => '99A306')
    ),
    'borders' => array(
      'bottom' => $default_border,
      'left' => $default_border,
      'top' => $default_border,
      'right' => $default_border,
    ),
    'fill' => array(
      'type' => PHPExcel_Style_Fill::FILL_SOLID,
      'color' => array('rgb' => 'CCCCCC'),
    ),
    'font' => array(
      'bold' => true, [2]
    ),
  ));
  $r = 3;

  $totalMwLeft = 0;
  $totalMwCovered = 0;
  $totalCumulative = 0;
  $totalHouseVisited = 0;
  $totalHardCopy = 0;
  $totalServiceProvided = 0;
  $totalRejected = 0;

  if ($selected_district != '99999999') {
    $query_result = db_select('special_drive_view', 'dv');

    $query_result->fields('dv', array('district_name', 'subdiv_name', 'block_mun_name', 'block_mun_code'));

    $query_result->condition('district_code', $selected_district);
    if ($selected_subdivision) {
      $query_result->condition('subdiv_code', $selected_subdivision);
    }
    if ($selected_block_code) {
      $query_result->condition('block_mun_code', $selected_block_code);
    }
    $query_result->orderBy('district_name');
    $query_result->orderBy('subdiv_name');
    $query_result->orderBy('block_mun_name');
    $query_result = $query_result->execute();

    foreach ($query_result as $key => $result) {
      $sl = $key + 1;

      $getSdMasterData = getSdMasterData($result->block_mun_code, $selected_date);
      $getSdInfoData = getSdInfoData($result->block_mun_code, $selected_date);

      $serviceProvided = $getSdMasterData[0] === NULL ? 0 : $getSdMasterData[0];
      $rowRejected = $getSdMasterData[1] === NULL ? 0 : $getSdMasterData[1];

      $rowMwLeftOut = $getSdInfoData[0] === NULL ? 0 : $getSdInfoData[0];
      $rowMwCoverToday = $getSdInfoData[1] === NULL ? 0 : $getSdInfoData[1];
      $rowCumulativeCover = $getSdInfoData[2] === NULL ? 0 : $getSdInfoData[2];
      $rowHouseVisited = $getSdInfoData[3] === NULL ? 0 : $getSdInfoData[3];
      $rowHdCopy = $getSdInfoData[4] === NULL ? 0 : $getSdInfoData[4];

      $sheet->setCellValue('A' . $r, $sl);
      $sheet->setCellValue('B' . $r, $result->district_name);
      $sheet->setCellValue('C' . $r, $result->subdiv_name);
      $sheet->setCellValue('D' . $r, $result->block_mun_name);
      $sheet->setCellValue('E' . $r, $rowMwLeftOut);

      $sheet->setCellValue('F' . $r, $rowMwCoverToday);
      $sheet->setCellValue('G' . $r, $rowCumulativeCover);
      $sheet->setCellValue('H' . $r, $rowHouseVisited);
      $sheet->setCellValue('I' . $r, $rowHdCopy);
      $sheet->setCellValue('J' . $r, $serviceProvided);
      $sheet->setCellValue('K' . $r, $rowRejected);
      $sheet->setCellValue('L' . $r, $serviceProvided);

      $totalMwLeft = $totalMwLeft + $rowMwLeftOut;
      $totalMwCovered = $totalMwCovered + $rowMwCoverToday;
      $totalCumulative = $totalCumulative + $rowCumulativeCover;
      $totalHouseVisited = $totalHouseVisited + $rowHouseVisited;
      $totalHardCopy = $totalHardCopy + $rowHdCopy;

      $totalServiceProvided = $totalServiceProvided + $serviceProvided;
      $totalRejected = $totalRejected + $rowRejected;

      // $cr = 'A3';
      // $cl = 'H'.$r;
      $sheet->getStyle('A' . $r)->applyFromArray($style);
      $sheet->getStyle('B' . $r)->applyFromArray($style);
      $sheet->getStyle('C' . $r)->applyFromArray($style);
      $sheet->getStyle('D' . $r)->applyFromArray($style);
      $sheet->getStyle('E' . $r)->applyFromArray($style);

      $sheet->getStyle('F' . $r)->applyFromArray($style);
      $sheet->getStyle('G' . $r)->applyFromArray($style);
      $sheet->getStyle('H' . $r)->applyFromArray($style);
      $sheet->getStyle('I' . $r)->applyFromArray($style);
      $sheet->getStyle('J' . $r)->applyFromArray($style);
      $sheet->getStyle('K' . $r)->applyFromArray($style);
      $sheet->getStyle('L' . $r)->applyFromArray($style);
      $r++;
    }
  } else {
    $query_result = db_select('special_drive_view', 'dv');

    $query_result->fields('dv', array('district_name', 'subdiv_name', 'block_mun_name', 'block_mun_code'));

    $query_result->orderBy('district_name');
    $query_result->orderBy('subdiv_name');
    $query_result->orderBy('block_mun_name');
    $query_result = $query_result->execute();

    foreach ($query_result as $key => $result) {
      $sl = $key + 1;

      $getSdMasterData = getSdMasterData($result->block_mun_code, $selected_date);
      $getSdInfoData = getSdInfoData($result->block_mun_code, $selected_date);

      $serviceProvided = $getSdMasterData[0] === NULL ? 0 : $getSdMasterData[0];
      $rowRejected = $getSdMasterData[1] === NULL ? 0 : $getSdMasterData[1];

      $rowMwLeftOut = $getSdInfoData[0] === NULL ? 0 : $getSdInfoData[0];
      $rowMwCoverToday = $getSdInfoData[1] === NULL ? 0 : $getSdInfoData[1];
      $rowCumulativeCover = $getSdInfoData[2] === NULL ? 0 : $getSdInfoData[2];
      $rowHouseVisited = $getSdInfoData[3] === NULL ? 0 : $getSdInfoData[3];
      $rowHdCopy = $getSdInfoData[4] === NULL ? 0 : $getSdInfoData[4];

      $sheet->setCellValue('A' . $r, $sl);
      $sheet->setCellValue('B' . $r, $result->district_name);
      $sheet->setCellValue('C' . $r, $result->subdiv_name);
      $sheet->setCellValue('D' . $r, $result->block_mun_name);
      $sheet->setCellValue('E' . $r, $rowMwLeftOut);

      $sheet->setCellValue('F' . $r, $rowMwCoverToday);
      $sheet->setCellValue('G' . $r, $rowCumulativeCover);
      $sheet->setCellValue('H' . $r, $rowHouseVisited);
      $sheet->setCellValue('I' . $r, $rowHdCopy);
      $sheet->setCellValue('J' . $r, $serviceProvided);
      $sheet->setCellValue('K' . $r, $rowRejected);
      $sheet->setCellValue('L' . $r, $serviceProvided);

      $totalMwLeft = $totalMwLeft + $rowMwLeftOut;
      $totalMwCovered = $totalMwCovered + $rowMwCoverToday;
      $totalCumulative = $totalCumulative + $rowCumulativeCover;
      $totalHouseVisited = $totalHouseVisited + $rowHouseVisited;
      $totalHardCopy = $totalHardCopy + $rowHdCopy;

      $totalServiceProvided = $totalServiceProvided + $serviceProvided;
      $totalRejected = $totalRejected + $rowRejected;

      // $cr = 'A3';
      // $cl = 'H'.$r;
      $sheet->getStyle('A' . $r)->applyFromArray($style);
      $sheet->getStyle('B' . $r)->applyFromArray($style);
      $sheet->getStyle('C' . $r)->applyFromArray($style);
      $sheet->getStyle('D' . $r)->applyFromArray($style);
      $sheet->getStyle('E' . $r)->applyFromArray($style);

      $sheet->getStyle('F' . $r)->applyFromArray($style);
      $sheet->getStyle('G' . $r)->applyFromArray($style);
      $sheet->getStyle('H' . $r)->applyFromArray($style);
      $sheet->getStyle('I' . $r)->applyFromArray($style);
      $sheet->getStyle('J' . $r)->applyFromArray($style);
      $sheet->getStyle('K' . $r)->applyFromArray($style);
      $sheet->getStyle('L' . $r)->applyFromArray($style);
      $r++;
    }
  }

  $output .= '<tr>
            <td style="background: #e3e3e3" colspan="1">&nbsp;</td>
            <td style="background: #e3e3e3" colspan="3"><strong>Total</strong></td>
            <td style="background: #e3e3e3"><strong>' . $totalMwLeft . '</strong></td>
            <td style="background: #e3e3e3"><strong>' . $totalMwCovered . '</strong></td>
            <td style="background: #e3e3e3"><strong>' . $totalCumulative . '</strong></td>
            <td style="background: #e3e3e3"><strong>' . $totalHouseVisited . '</strong></td>
            <td style="background: #e3e3e3"><strong>' . $totalHardCopy . '</strong></td>
            <td style="background: #e3e3e3"><strong>' . $totalServiceProvided . '</strong></td>
            <td style="background: #e3e3e3"><strong>' . $totalRejected . '</strong></td>
            <td style="background: #e3e3e3"><strong>' . $totalServiceProvided . '</strong></td>
        </tr>';

  $sheet->getStyle('A' . $r . ':L' . $r . '')->applyFromArray(
    array(
      'fill' => array(
        'type' => PHPExcel_Style_Fill::FILL_SOLID,
        'color' => array('rgb' => 'BCBD91'),
      ),
    )
  );

  $sheet->mergeCells('A' . $r . ':D' . $r);
  $sheet->setCellValue('A' . $r, strtoupper("Total:"));
  $sheet->setCellValue('E' . $r, '=SUM(E3:E' . ($r - 1) . ')');
  $sheet->setCellValue('F' . $r, '=SUM(F3:F' . ($r - 1) . ')');
  $sheet->setCellValue('G' . $r, '=SUM(G3:G' . ($r - 1) . ')');
  $sheet->setCellValue('H' . $r, '=SUM(H3:H' . ($r - 1) . ')');
  $sheet->setCellValue('I' . $r, '=SUM(I3:I' . ($r - 1) . ')');
  $sheet->setCellValue('J' . $r, '=SUM(J3:J' . ($r - 1) . ')');
  $sheet->setCellValue('K' . $r, '=SUM(K3:K' . ($r - 1) . ')');
  $sheet->setCellValue('L' . $r, '=SUM(L3:L' . ($r - 1) . ')');

  $sheet->getStyle('A' . $r . ':L' . $r . '')->applyFromArray($style);

  $objPHPExcel->setActiveSheetIndex(0);
  $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
  ob_end_clean();

  $filename = 'sd-static-report-' . date('Y-m-d-H-i-s') . '.xls';
  header('Content-Disposition: attachment;filename=' . basename(strtolower($filename)));

  header('Cache-Control: max-age=0');
  header('Cache-Control: max-age=1');
  $objWriter->save('php://output');
}

// AJAX STARTS ---------------------------
function get_ajax_callback_address($form, $form_state)
{
  $commands     = array();
  $commands[] = ajax_command_replace('#subdivision_replace', drupal_render($form['report']['subdivision_code']));
  $commands[] = ajax_command_replace('#block_type_replace', drupal_render($form['report']['block_type']));
  $commands[] = ajax_command_replace('#block_code_replace', drupal_render($form['report']['block_code']));
  $commands[] = ajax_command_replace('#ward_village_replace', drupal_render($form['report']['ward_village']));
  return array('#type' => 'ajax', '#commands' => $commands);
}

function get_ajax_callback_migration_type($form, $form_state)
{
  $commands1     = array();
  $commands1[] = ajax_command_replace('#start_date_replace', drupal_render($form['report']['start_date']));
  $commands1[] = ajax_command_replace('#end_date_replace', drupal_render($form['report']['end_date']));
  return array('#type' => 'ajax', '#commands' => $commands1);
}
