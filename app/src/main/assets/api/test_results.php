<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'config/database.php';

// Check if user is logged in
if (!isset($_SESSION['logged_in']) || !$_SESSION['logged_in']) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

try {
    $user_id = $_SESSION['user_id'];
    
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Get user's test results
        $stmt = $pdo->prepare("SELECT * FROM test_results WHERE user_id = ? ORDER BY completed_at DESC");
        $stmt->execute([$user_id]);
        $results = $stmt->fetchAll();
        
        echo json_encode([
            'success' => true,
            'results' => $results
        ]);
        
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Save test results
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input) {
            $input = $_POST;
        }
        
        $required_fields = ['test_type', 'score', 'total_questions'];
        foreach ($required_fields as $field) {
            if (!isset($input[$field])) {
                echo json_encode(['success' => false, 'message' => "Field '$field' is required"]);
                exit;
            }
        }
        
        $test_type = $input['test_type'];
        $score = (int)$input['score'];
        $total_questions = (int)$input['total_questions'];
        $answers = isset($input['answers']) ? json_encode($input['answers']) : null;
        
        // Calculate percentage
        $percentage = ($score / $total_questions) * 100;
        
        // Check if user already has results for this test type
        $stmt = $pdo->prepare("SELECT id FROM test_results WHERE user_id = ? AND test_type = ?");
        $stmt->execute([$user_id, $test_type]);
        
        if ($stmt->fetch()) {
            // Update existing result
            $stmt = $pdo->prepare("UPDATE test_results SET score = ?, total_questions = ?, percentage = ?, answers = ?, completed_at = CURRENT_TIMESTAMP WHERE user_id = ? AND test_type = ?");
            $result = $stmt->execute([$score, $total_questions, $percentage, $answers, $user_id, $test_type]);
        } else {
            // Insert new result
            $stmt = $pdo->prepare("INSERT INTO test_results (user_id, test_type, score, total_questions, percentage, answers) VALUES (?, ?, ?, ?, ?, ?)");
            $result = $stmt->execute([$user_id, $test_type, $score, $total_questions, $percentage, $answers]);
        }
        
        if ($result) {
            echo json_encode([
                'success' => true,
                'message' => 'Test results saved successfully'
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to save test results']);
        }
    }
    
} catch (PDOException $e) {
    error_log("Test results error: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Database error occurred']);
} catch (Exception $e) {
    error_log("Test results error: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'An error occurred']);
}
?>
